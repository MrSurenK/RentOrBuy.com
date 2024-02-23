FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /backend

COPY Pipfile Pipfile.lock requirements.txt /backend/

RUN pip install pipenv
RUN pipenv install
RUN pip install -r requirements.txt

COPY . /backend/

CMD ["pipenv", "run", "python3","manage.py","runserver"]











