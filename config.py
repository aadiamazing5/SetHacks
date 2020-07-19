import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or "this_is_a_very_unique_string"