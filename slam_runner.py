"""Defines handler paths and initiates the app."""
import admin_add_beta_user
import main
import webapp2

app = webapp2.WSGIApplication(
    [
        ('/', main.Handler),
        ('/admin/add_beta_user', admin_add_beta_user.Handler)
    ],
    debug=False)
