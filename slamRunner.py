"""Defines handler paths and initiates the app."""
import main
import webapp2

app = webapp2.WSGIApplication([('/', main.Handler)], debug=False)
