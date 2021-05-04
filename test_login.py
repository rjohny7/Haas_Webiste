from api import db,User, Login
import pytest_check as check
from werkzeug.security import check_password_hash

def test_login():
    x = Login()
    x.post('abc@gmail.com','secret')

    #testing whether users are added to database
    u1 = User.query.filter_by(username='abc@gmail.com').first()
    check.equal(check_password_hash(u1.password,'secret'),True)

    #testing whether free credits are assigned
    u2 = x.get('abc@gmail.com','secret')
    check.equal(u1.credits,u2['credits'])

    x.post('def@gmail.com','key')

    #testing whether users are added to database
    u3 = User.query.filter_by(username='def@gmail.com').first()
    check.equal(check_password_hash(u3.password,'key'),True)

    #testing whether free credits are assigned
    u4 = x.get('def@gmail.com','key')
    check.equal(u3.credits,u4['credits'])