import base
import jinja2
import os
import webapp2

from google.appengine.api import users
from py import beta_user


class Handler(base.Handler):
  def get(self):
    self._write_template('add_beta_user.html', {})

  def post(self):
    if users.is_current_user_admin():
      beta_user.add_new_user(self.request.get('email', None))
