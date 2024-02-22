FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERD=1

WORKDIR /djangoBackend

COPY . /djangoBackend/

RUN pip install pipenv
RUN pipenv install
RUN pip install -r requirement.txt












