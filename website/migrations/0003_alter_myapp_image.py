# Generated by Django 5.0 on 2023-12-28 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_myapp_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myapp',
            name='Image',
            field=models.ImageField(upload_to='my_apps'),
        ),
    ]