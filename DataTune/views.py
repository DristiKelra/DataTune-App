# views.py
from rest_framework import generics
from rest_framework.response import Response
from .models import UploadedData
from django.shortcuts import render, redirect
from DataTune.api.serializers import YourModelSerializer
import subprocess
from django.http import JsonResponse, HttpResponse
import pandas as pd
from DataTune.functions import preprocess_data  # contains the preprocessed data functions in python
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser

from rest_framework import status

from .serializers import UploadedFileSerializer

from django.conf import settings
import pandas as pd  
from django.views.decorators.csrf import csrf_exempt
import json
from django.middleware.csrf import get_token

# data visualization import 
from collections import Counter
from django.core.files.storage import FileSystemStorage
import os
from django.contrib import messages

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


class FileUploadView(APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

        try:
            file_obj = request.FILES['file']
        except KeyError:
            return Response({'error': 'File not provided in the request.'}, status=status.HTTP_400_BAD_REQUEST)

        file_obj = request.FILES['file']
        

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



def visualize_file_content(request, file_path):
    try:
        # Read the file content using pandas or any other appropriate library
        df = pd.read_csv(file_path)  
        # Convert the DataFrame to HTML for visualization
        file_content_html = df.to_html(index=False)

        # Render the content in an HTML template
        return render(request, 'file_visualization.html', {'file_content_html': file_content_html})
    except Exception as e:
        # Handle exceptions (e.g., file not found, invalid file format)
        return HttpResponse(f"Error: {str(e)}")


    

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


def readfile(filename):

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

def get_latest_file(directory):
    """Return the path of the latest file in the directory."""
    if not os.path.exists(directory):
        try:
            os.makedirs(directory)  # Create the directory if it doesn't exist
        except OSError as e:
            print(f"Error creating directory: {e}")
            return None  # Return None if unable to create the directory
    
    files = os.listdir(directory)
    if not files:
        return None
    
    latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(directory, f)))
    return os.path.join(directory, latest_file)




def get_eda_report(request):
    # Read the HTML file
    notebook_file_path = os.path.join(settings.BASE_DIR, 'static\jupyter notebook', 'Django_UploadedData.ipynb')
    try:
        subprocess.run(['jupyter', 'nbconvert', '--execute', '--to', 'html', notebook_file_path, '--ExecutePreprocessor.timeout=600', f'--NotebookApp.iopub_data_rate_limit=1.0e10'])
        eda_report_directory = os.path.join(settings.EDA_REPORT_DIRECTORY, 'EDA_report')
        latest_report_path = get_latest_file(eda_report_directory)
    
        if latest_report_path:
            # Read the latest HTML file
            with open(latest_report_path, 'r') as file:
                eda_report_content = file.read()
            return HttpResponse(eda_report_content, content_type='text/html')
        else:
            return HttpResponse("Error: EDA report file not found", status=500)
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error fetching EDA report: {e}")
        return HttpResponse("Error: Failed to fetch EDA report", status=500)

def preprocess_view(request):
    if request.method == 'POST' and request.FILES['file']:
        file = request.FILES['file']
        try:
            # Try reading as CSV first
            df = pd.read_csv(file)
        except pd.errors.ParserError:
            # If reading as CSV fails, try reading as Excel
            try:
                df = pd.read_excel(file)
            except pd.errors.ParserError:
                return JsonResponse({'error': 'Invalid file format. Please upload a CSV or Excel file.'})
        
        output_data = preprocess_data(df)  # Implement this function using your preprocessing logic
        return JsonResponse(output_data, safe=False)
    else:
        return JsonResponse({'error': 'File not provided or invalid'})
    
# Django view function for handling file upload and preprocessing
def upload_file(request):
    if request.method == 'POST' and request.FILES['file']:
        uploaded_file = request.FILES['file']
        df = preprocess_data(uploaded_file)
        # Return a response or render a template with the preprocessed data
        return render(request, 'preprocessed_data.html', {'df': df})
