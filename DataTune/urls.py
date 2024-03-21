# urls.py
from django.urls import path
from django.urls import path
from django.contrib import admin
from . import views
from .views import HandleMissingValuesView, get_eda_report


from .views import FileUploadView, UploadedFileListView, visualize_file_content, get_csrf_token

urlpatterns = [
    path('visualize-file/<str:file_path>/', visualize_file_content, name='visualize_file_content'),
    path('admin/', admin.site.urls),
    path('api/upload/', FileUploadView.as_view(), name='file-upload'),
    path('api/files/', UploadedFileListView.as_view(), name='file-list'),
    path('get-csrf-token/', get_csrf_token, name='get-csrf-token'),
    path('api/get-eda-report/', get_eda_report, name='get_eda_report'),
    path('handle-missing-values/<int:pk>/', HandleMissingValuesView.as_view(), name='handle_missing_values'),
]


