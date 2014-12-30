import base
import os
import jinja2
import webapp2


class Handler(base.Handler):
  def get(self):
    self._write_template('index.html', {})
