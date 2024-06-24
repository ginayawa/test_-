from cryptography.fernet import Fernet

# 固定の鍵を使用（本番環境では環境変数などにより管理する）
key = b'_V2B8vlb2fMEBRpsdWEVdoQ3GXvP8PrhLa2nS5-cByM='  # 32バイトのURLセーフなBase64エンコード形式
cipher_suite = Fernet(key)

def encrypt_data(data: str) -> str:
    """データを暗号化する"""
    try:
        encoded_data = data.encode('utf-8')
        encrypted_data = cipher_suite.encrypt(encoded_data)
        return encrypted_data.decode('utf-8')
    except Exception as e:
        print(f"Error encrypting data: {e}")
        raise

def decrypt_data(encrypted_data: str) -> str:
    """データを復号化する"""
    try:
        decoded_data = encrypted_data.encode('utf-8')
        decrypted_data = cipher_suite.decrypt(decoded_data)
        return decrypted_data.decode('utf-8')
    except Exception as e:
        print(f"Error decrypting data: {e}")
        raise
