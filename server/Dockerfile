# start by pulling the python image
FROM python:latest
ADD ./server_side
WORKDIR /server_side
RUN pip install -r requirements.txt
CMD python3 app.py
