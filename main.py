import base
import os
import jinja2
import webapp2

from py import beta_user


class Handler(base.Handler):
  def get(self):
    if beta_user.is_beta_user():
      self._write_template('index.html', {})
    else:
      self.error(403)
