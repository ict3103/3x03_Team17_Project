# start by pulling the python image
FROM python:3.9
ADD ./server /server_side
WORKDIR /server_side
RUN python3 -m pip install -r requirements.txt
EXPOSE 5000
CMD [ "python", "app.py" ]
