# Generated by Django 4.2.5 on 2023-09-12 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0004_alter_carsale_transaction_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rental',
            name='rental_status',
            field=models.CharField(choices=[('NC', 'Not collected'), ('CO', 'Collected'), ('RE', 'Returned'), ('OD', 'Over Due')], default='NC', max_length=2),
        ),
    ]
