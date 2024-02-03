# views.py
from rest_framework import generics
from rest_framework.response import Response
from .models import UploadedData
from django.shortcuts import render
from DataTune.api.serializers import YourModelSerializer

# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


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
from .serializers import UploadedFileSerializer

class FileUploadView(APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES['file']
        
        print(f'Received file: {file_obj.name}')
        uploaded_file = UploadedData(file=file_obj)
        uploaded_file.save()
        
        serializer = UploadedFileSerializer(uploaded_file)
        # Process the file as needed (e.g., save to database, perform operations)
        # Return a response as needed
        return Response({'message': 'File uploaded successfully','data': serializer.data})

class UploadedFileListView(APIView):
    def get(self, request, *args, **kwargs):
        uploaded_files = UploadedData.objects.all()
        serializer = UploadedFileSerializer(uploaded_files, many=True)
        return Response(serializer.data)



def list_uploaded_files(request):
    files = UploadedData.objects.all()
    return render(request, 'file_list.html', {'files': files})

# Create your views here.


# Uploaded File as a html
from django.http import HttpResponse
from django.shortcuts import render
import pandas as pd  # Assuming you have pandas installed

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
    
#Data Visualization
from collections import Counter

from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
import os

from django.contrib import messages
#dict ={}
def index(request):

    context = {}
    global attribute

    if request.method == 'POST':

        uploaded_file = request.FILES['document']
        attribute = request.POST.get('attributeid')

        print(attribute)

        #check if this file ends with csv
        if uploaded_file.name.endswith('.csv'):
            savefile = FileSystemStorage()

            name = savefile.save(uploaded_file.name, uploaded_file) #gets the name of the file
            print(name)


            #we need to save the file somewhere in the project, MEDIA
            #now lets do the savings

            d = os.getcwd() # how we get the current dorectory
            # file_directory = d+'\media\\'+name #saving the file in the media directory
            print(file_directory)
            readfile(file_directory)

            request.session['attribute'] = attribute

            if attribute not in data.axes[1]:
                messages.warning(request, 'Please write the column name correctly')
            else:
                print(attribute)
                return redirect(results)

        else:
            messages.warning(request, 'File was not uploaded. Please use .csv file extension!')


    return  render(request, 'index.html', context)


            #project_data.csv
def readfile(filename):

    #we have to create those in order to be able to access it around
    # use panda to read the file because i can use DATAFRAME to read the file
    #column;culumn2;column
    global rows,columns,data,my_file,missing_values
     #read the missing data - checking if there is a null
    missingvalue = ['?', '0', '--']

    my_file = pd.read_csv(filename, sep='[:;,|_]',na_values=missingvalue, engine='python')

    data = pd.DataFrame(data=my_file, index=None)
    print(data)

    rows = len(data.axes[0])
    columns = len(data.axes[1])


    null_data = data[data.isnull().any(axis=1)] # find where is the missing data #na null =['x1','x13']
    missing_values = len(null_data)



def results(request):
    # prepare the visualization
                                #12
    message = 'I found ' + str(rows) + ' rows and ' + str(columns) + ' columns. Missing data: ' + str(missing_values)
    messages.warning(request, message)

    dashboard = [] # ['A11','A11',A'122',]
    for x in data[attribute]:
        dashboard.append(x)

    my_dashboard = dict(Counter(dashboard)) #{'A121': 282, 'A122': 232, 'A124': 154, 'A123': 332}

    print(my_dashboard)

    keys = my_dashboard.keys() # {'A121', 'A122', 'A124', 'A123'}
    values = my_dashboard.values()

    listkeys = []
    listvalues = []

    for x in keys:
        listkeys.append(x)

    for y in values:
        listvalues.append(y)

    print(listkeys)
    print(listvalues)

    context = {
        'listkeys': listkeys,
        'listvalues': listvalues,
    }

    return render(request, 'result.html', context)
