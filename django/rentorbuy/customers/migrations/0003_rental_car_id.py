# Generated by Django 4.2.5 on 2023-09-07 01:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dealer', '0001_initial'),
        ('customers', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='rental',
            name='car_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='dealer.car'),
        ),
    ]
