# Create ssl for local host
1. brew install easy-rsa
2. easyrsa init-pki
3. easyrsa build-ca nopass
4. easyrsa --days=3650 "--subject-alt-name=IP:127.0.0.1,DNS:localhost,DNS:*.localhost" build-server-full localhost nopass
5. sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /opt/homebrew/etc/pki/ca.crt
6. mkdir keys
7. echo "keys" >> .gitignore
6. cp /opt/homebrew/etc/pki/issued/localhost.crt ./keys/localhost.crt
7. cp /opt/homebrew/etc/pki/private/localhost.key ./keys/localhost.key
