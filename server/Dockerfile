# start by pulling the python image
FROM python:3.9
ADD ./server /server_side
WORKDIR /server_side
RUN pip3 install PyJWT
RUN python3 -m pip install -r requirements.txt
CMD [ "python", "app.py" ]
