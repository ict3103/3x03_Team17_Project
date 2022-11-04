# start by pulling the python image
FROM python

# switch working directory
WORKDIR /server


# copy every content from the local file to the image
COPY . /server

# install the dependencies and packages in the requirements file
RUN pip3 install -r requirements.txt

EXPOSE 5000

# configure the container to run in an executed manner
# ENTRYPOINT [ "python3" ]

# CMD ["app.py" ]
CMD ["flask", "run", "--host", "0.0.0.0"]
