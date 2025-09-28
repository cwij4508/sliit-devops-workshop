#!/bin/bash

# User data script for web servers
# This script runs when EC2 instances start

# Update system
yum update -y

# Install required packages
yum install -y httpd
yum install -y docker

# Start and enable services
systemctl start httpd
systemctl enable httpd
systemctl start docker
systemctl enable docker

# Add ec2-user to docker group
usermod -a -G docker ec2-user

# Create a simple web page
cat > /var/www/html/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SLIIT Terraform Web Stack</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            text-align: center;
            max-width: 600px;
        }
        .info-box {
            background: rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .status { color: #2ecc71; font-weight: bold; }
        h1 { margin-bottom: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 SLIIT Terraform Web Stack</h1>
        <p>This web server was deployed using Infrastructure as Code!</p>
        
        <div class="info-box">
            <h3>📊 Instance Information</h3>
            <p><strong>Instance ID:</strong> <span id="instance-id">Loading...</span></p>
            <p><strong>Availability Zone:</strong> <span id="az">Loading...</span></p>
            <p><strong>Private IP:</strong> <span id="private-ip">Loading...</span></p>
            <p><strong>Public IP:</strong> <span id="public-ip">Loading...</span></p>
        </div>

        <div class="info-box">
            <h3>🏗️ Infrastructure</h3>
            <p><strong>Project:</strong> ${project_name}</p>
            <p><strong>Deployed:</strong> <span class="status">Successfully</span></p>
            <p><strong>Load Balanced:</strong> <span class="status">Yes</span></p>
            <p><strong>Auto Scaling:</strong> <span class="status">Enabled</span></p>
        </div>

        <div class="info-box">
            <p><strong>Server Time:</strong> <span id="server-time"></span></p>
            <p><strong>Uptime:</strong> <span id="uptime">Loading...</span></p>
        </div>
    </div>

    <script>
        // Fetch instance metadata
        async function fetchMetadata() {
            try {
                const instanceId = await fetch('http://169.254.169.254/latest/meta-data/instance-id').then(r => r.text());
                const az = await fetch('http://169.254.169.254/latest/meta-data/placement/availability-zone').then(r => r.text());
                const privateIp = await fetch('http://169.254.169.254/latest/meta-data/local-ipv4').then(r => r.text());
                const publicIp = await fetch('http://169.254.169.254/latest/meta-data/public-ipv4').then(r => r.text());

                document.getElementById('instance-id').textContent = instanceId;
                document.getElementById('az').textContent = az;
                document.getElementById('private-ip').textContent = privateIp;
                document.getElementById('public-ip').textContent = publicIp;
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        }

        // Update server time
        function updateTime() {
            document.getElementById('server-time').textContent = new Date().toLocaleString();
        }

        // Initialize
        fetchMetadata();
        updateTime();
        setInterval(updateTime, 1000);

        // Fetch uptime
        fetch('/server-info')
            .then(response => response.text())
            .then(data => {
                document.getElementById('uptime').textContent = data;
            })
            .catch(() => {
                document.getElementById('uptime').textContent = 'N/A';
            });
    </script>
</body>
</html>
EOF

# Create a simple API endpoint for server info
cat > /var/www/html/server-info << 'EOF'
#!/bin/bash
echo "Content-Type: text/plain"
echo ""
uptime
EOF

chmod +x /var/www/html/server-info

# Configure Apache to handle the script
echo "ScriptAlias /server-info /var/www/html/server-info" >> /etc/httpd/conf/httpd.conf

# Restart Apache to apply changes
systemctl restart httpd

# Log deployment completion
echo "$(date): Web server deployment completed" >> /var/log/user-data.log