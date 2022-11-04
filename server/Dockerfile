# start by pulling the python image
FROM python:3.9
ADD ./server /server_side2
WORKDIR /server_side2
RUN ls
RUN python3 -m pip install -r requirements.txt
CMD [ "python", "app.py" ]
