import logging
from django.conf import settings

logger = logging.getLogger(__name__)

_mongo_client = None
_mongo_db = None

def get_mongo_db():
    global _mongo_client, _mongo_db
    if _mongo_db is not None:
        return _mongo_db

    try:
        from pymongo import MongoClient
        uri = getattr(settings, 'MONGODB_URI', None)
        db_name = getattr(settings, 'MONGODB_NAME', 'micronanofabsoft_db')
        
        if not uri:
            return None

        _mongo_client = MongoClient(uri, serverSelectionTimeoutMS=4000)
        _mongo_db = _mongo_client[db_name]
        return _mongo_db
    except Exception as e:
        logger.warning(f"MongoDB connection failed: {e}")
        return None

def sync_user_to_mongodb(user_data):
    db = get_mongo_db()
    if db is None:
        return False
    try:
        users_col = db['micronanofabsoft_users']
        users_col.update_one(
            {'email': user_data['email']},
            {'$set': user_data},
            upsert=True
        )
        return True
    except Exception as e:
        logger.error(f"Error syncing user to MongoDB: {e}")
        return False

def sync_trial_request_to_mongodb(trial_data):
    db = get_mongo_db()
    if db is None:
        return False
    try:
        trials_col = db['micronanofabsoft_trials']
        trials_col.insert_one(trial_data)
        return True
    except Exception as e:
        logger.error(f"Error syncing trial request to MongoDB: {e}")
        return False

def sync_contact_inquiry_to_mongodb(contact_data):
    db = get_mongo_db()
    if db is None:
        return False
    try:
        inquiries_col = db['micronanofabsoft_inquiries']
        inquiries_col.insert_one(contact_data)
        return True
    except Exception as e:
        logger.error(f"Error syncing contact inquiry to MongoDB: {e}")
        return False

def sync_subscription_to_mongodb(sub_data):
    db = get_mongo_db()
    if db is None:
        return False
    try:
        subs_col = db['micronanofabsoft_subscriptions']
        subs_col.update_one(
            {'email': sub_data['email']},
            {'$set': sub_data},
            upsert=True
        )
        return True
    except Exception as e:
        logger.error(f"Error syncing subscription to MongoDB: {e}")
        return False

def sync_service_request_to_mongodb(service_data):
    db = get_mongo_db()
    if db is None:
        return False
    try:
        requests_col = db['micronanofabsoft_service_requests']
        requests_col.insert_one(service_data)
        return True
    except Exception as e:
        logger.error(f"Error syncing service request to MongoDB: {e}")
        return False
