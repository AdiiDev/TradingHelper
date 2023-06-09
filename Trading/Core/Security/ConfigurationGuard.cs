﻿using System.Security.Cryptography;
using System.Text;

namespace Core.Security
{
    //https://learn.microsoft.com/pl-pl/dotnet/api/system.security.cryptography.aes?view=net-7.0
    public class ConfigurationGuard
    {
        private readonly byte[] _aesKey = SHA256Managed.Create().ComputeHash(Encoding.ASCII.GetBytes("n0ja12kry31!!@@mcna"));
        private readonly byte[] _aesIV = MD5.Create().ComputeHash(Encoding.ASCII.GetBytes("n0ja12kry31!!@@mcna"));

        public byte[] Encrypt(string rawData)
        {
            var encrypted = Encrypt(rawData, _aesKey, _aesIV);

            return encrypted; //System.Text.Encoding.UTF8.GetString(encrypted);
        }

        private byte[] Encrypt(string plainText, byte[] Key, byte[] IV)
        {
            byte[] encrypted;
            // Create a new AesManaged.    
            using (AesManaged aes = new AesManaged())
            {
                // Create encryptor    
                ICryptoTransform encryptor = aes.CreateEncryptor(Key, IV);
                // Create MemoryStream    
                using (MemoryStream ms = new MemoryStream())
                {
                    // Create crypto stream using the CryptoStream class. This class is the key to encryption    
                    // and encrypts and decrypts data from any given stream. In this case, we will pass a memory stream    
                    // to encrypt    
                    using (CryptoStream cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    {
                        // Create StreamWriter and write data to a stream    
                        using (StreamWriter sw = new StreamWriter(cs))
                            sw.Write(plainText);
                        encrypted = ms.ToArray();
                    }
                }
            }
            // Return encrypted data    
            return encrypted;
        }

        public string Decrypt(byte[] rawData)
        {
            //var cipherText = Encoding.UTF8.GetBytes(rawData);

            return Decrypt(rawData, _aesKey, _aesIV);
        }

        private string Decrypt(byte[] cipherText, byte[] Key, byte[] IV)
        {
            string plaintext = null;
            // Create AesManaged    
            using (AesManaged aes = new AesManaged())
            {
                // Create a decryptor    
                ICryptoTransform decryptor = aes.CreateDecryptor(Key, IV);
                // Create the streams used for decryption.    
                using (MemoryStream ms = new MemoryStream(cipherText))
                {
                    // Create crypto stream    
                    using (CryptoStream cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                    {
                        // Read crypto stream    
                        using (StreamReader reader = new StreamReader(cs))
                            plaintext = reader.ReadToEnd();
                    }
                }
            }
            return plaintext;
        }
    }
}
