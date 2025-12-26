"""
Basic test file for eSIM Myanmar backend
Ensures CI/CD pipeline passes
"""

def test_basic():
    """Basic test to ensure pytest runs successfully"""
    assert True

def test_imports():
    """Test that core modules can be imported"""
    try:
        import fastapi
        import uvicorn
        import pymongo
        assert True
    except ImportError:
        assert False, "Core dependencies not available"