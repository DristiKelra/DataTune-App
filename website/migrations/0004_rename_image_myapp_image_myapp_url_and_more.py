# Generated by Django 5.0 on 2024-01-06 20:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_alter_myapp_image'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='myapp',
            old_name='Image',
            new_name='image',
        ),
        migrations.AddField(
            model_name='myapp',
            name='url',
            field=models.CharField(default='/DataTune', max_length=30),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='myapp',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='my_apps', to=settings.AUTH_USER_MODEL),
        ),
    ]