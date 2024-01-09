# urls.py
from django.urls import path
from django.urls import path
from django.contrib import admin
from . import views

from .views import HandleMissingValuesView

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', views.index, name='index'),
    # Other URLs...
    path('handle-missing-values/<int:pk>/', HandleMissingValuesView.as_view(), name='handle_missing_values'),
]
