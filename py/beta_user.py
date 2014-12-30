from google.appengine.api import memcache
from google.appengine.api import users
from google.appengine.ext import ndb


_ALL_USERS_KEY = 'mem;allusers'


class BetaUser(ndb.Model):
  email = ndb.StringProperty(required=True)


def add_new_user(email):
  if not email:
    return

  BetaUser(id=email, email=email).put()
  memcache.delete(_ALL_USERS_KEY)


def _get_all_users():
  users = memcache.get(_ALL_USERS_KEY)
  if not users:
    users = [user.email for user in BetaUser.query().fetch()]
    memcache.set(_ALL_USERS_KEY, users)
  return users


def is_beta_user():
  return users.get_current_user().email() in _get_all_users()
