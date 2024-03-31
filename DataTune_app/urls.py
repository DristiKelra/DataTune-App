from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

from DataTune.views import FileUploadView, UploadedFileListView, visualize_file_content,get_csrf_token, get_eda_report



urlpatterns = [
    
    path('',TemplateView.as_view(template_name ='index.html')),
    path('dashboard/',TemplateView.as_view(template_name ='index.html')),
    path('api/get-eda-report/', get_eda_report, name='get_eda_report'),
    path('admin/', admin.site.urls),
    path('api/', include('DataTune_app.api.urls')),
    path('DataTune/', include('DataTune.urls')),
    path('api/upload/', FileUploadView.as_view(), name='file-upload'),
    path('get-csrf-token/', get_csrf_token, name='get-csrf-token'),
    path('visualize-file/<path:file_path>/', visualize_file_content, name='visualize_file_content'),


    path('api/files/', UploadedFileListView.as_view(), name='file-list'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


 #path('', include('DataTune.api.urls')),
    #path('api/', include('DataTune_app.api.urls')),
    #path('', include('website.urls')),
    #path('DataTune/', include('DataTune.urls')),
    #re_path(r"^.*", TemplateView.as_view(template_name = "index.html")),
   