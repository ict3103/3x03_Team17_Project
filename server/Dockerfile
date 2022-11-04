# start by pulling the python image
FROM python:3.9-buster
ADD ./server /server_side
WORKDIR /server_side
RUN ls
RUN python3 -m pip install -r requirements.txt
CMD python3 app.py
