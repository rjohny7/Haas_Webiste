from api import db,User,HardwareResources,HWSets
import pytest_check as check

def test_hardware():
    x = HardwareResources()
    
    #define a user
    u1 = User(id=123,username="user@gmail.com",password="pwd",credits=7,checked_out=3)
    db.session.add(u1)
    db.session.commit()
    #checks out 4, has enough credits
    hw2 = x.post(1,"T",4,u1.username)
    check.equal(u1.checked_out,7)
    check.equal(u1.credits,3)

    #attempts to checkout more than checked out
    hw1 = x.post(1,"F",5,"user@gmail.com")
    check.equal(hw1,"Exceeded hardware set capacity")

    
    
    #user does not have enough credits
    hw3 = x.post(1,"T",5,u1.username)
    check.equal(hw3,"You do not have enough credits")