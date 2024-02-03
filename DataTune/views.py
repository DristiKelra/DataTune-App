# views.py
from rest_framework import generics
from rest_framework.response import Response
from .models import UploadedData
from django.shortcuts import render
from DataTune.api.serializers import YourModelSerializer

# views.py
from django.http import HttpResponse
from django.shortcuts import render
import pandas as pd  
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


class HandleMissingValuesView(generics.UpdateAPIView):
    queryset = UploadedData.objects.all()
    serializer_class = YourModelSerializer

    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # Save updated data
        return Response(serializer.data)



# @csrf_exempt
# def handle_uploaded_file(request):
#     if request.method == 'POST':
#         uploaded_file = request.FILES.get('file')
#         if uploaded_file:
#             uploaded_file.read()
#             # Process the uploaded file as needed
#             # You can access file content using: uploaded_file.read()
#             return JsonResponse({'message': 'File uploaded successfully'})
#         else:
#             return JsonResponse({'message': 'No file provided'}, status=400)
#     else:
#         return JsonResponse({'message': 'Invalid request method'}, status=405)


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from .models import UploadedData
from rest_framework import status
from .serializers import UploadedFileSerializer

class FileUploadView(APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        try:
            file_obj = request.FILES['file']
        except KeyError:
            return Response({'error': 'File not provided in the request.'}, status=status.HTTP_400_BAD_REQUEST)
        print(f'Received file: {file_obj.name}')
        uploaded_file = UploadedData(file=file_obj)
        uploaded_file.save()
        
        serializer = UploadedFileSerializer(uploaded_file)
        return Response({'message': 'File uploaded successfully','data': serializer.data},status=status.HTTP_201_CREATED)

class UploadedFileListView(APIView):
    def get(self, request, *args, **kwargs):
        uploaded_files = UploadedData.objects.all()
        serializer = UploadedFileSerializer(uploaded_files, many=True)
        return Response(serializer.data)



def list_uploaded_files(request):
    files = UploadedData.objects.all()
    return render(request, 'file_list.html', {'files': files})



# Uploaded File as a html


def visualize_file_content(request, file_path):
    try:
        # Read the file content using pandas or any other appropriate library
        df = pd.read_csv(file_path)  # Change this based on your file type

        # Convert the DataFrame to HTML for visualization
        file_content_html = df.to_html(index=False)

        # Render the content in an HTML template
        return render(request, 'file_visualization.html', {'file_content_html': file_content_html})
    except Exception as e:
        # Handle exceptions (e.g., file not found, invalid file format)
        return HttpResponse(f"Error: {str(e)}")
