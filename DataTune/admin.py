from django.contrib import admin
from DataTune import models

# Register your models here.
admin.site.register(models.DataHandleModel)
admin.site.register(models.DynamicData)
admin.site.register(models.UploadedData)
