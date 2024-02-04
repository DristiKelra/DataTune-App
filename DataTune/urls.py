# urls.py
from django.urls import path
from django.urls import path
from django.contrib import admin
from . import views

from .views import HandleMissingValuesView

from django.urls import path

from .views import FileUploadView, UploadedFileListView, visualize_file_content, get_csrf_token





urlpatterns = [
    path('visualize-file/<str:file_path>/', visualize_file_content, name='visualize_file_content'),
    path('admin/', admin.site.urls),
    path('api/upload/', FileUploadView.as_view(), name='file-upload'),
    path('api/files/', UploadedFileListView.as_view(), name='file-list'),

    path('get-csrf-token/', get_csrf_token, name='get-csrf-token'),

    #path('', views.index, name='index'),
    #path('api/upload/', handle_uploaded_file, name='handle_uploaded_file'),
    # Other URLs...
    path('handle-missing-values/<int:pk>/', HandleMissingValuesView.as_view(), name='handle_missing_values'),
]


