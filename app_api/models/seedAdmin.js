// app_api/models/seedAdmin.js
// Run with: node seedAdmin.js (from this folder)
// Ensures there is an "admin" user with password "Admin123!"

const mongoose = require('./db');           // same pattern as seed.js
const User = mongoose.model('users');

async function seedAdmin() {
    try {
        const username = 'admin';
        const password = 'Admin123!';

        let user = await User.findOne({ username }).exec();

        if (!user) {
            console.log('No admin user found. Creating one...');
            user = new User({
                username,
                password,
                name: 'Admin User',
                email: 'admin@example.com'
            });
        } else {
            console.log('Admin user found. Resetting password...');
            user.password = password; // will be re-hashed by pre("save")
        }

        await user.save(); // triggers the pre('save') to hash the password
        console.log('✅ Admin user is ready.');
        console.log('   Username:', username);
        console.log('   Password:', password);
    } catch (err) {
        console.error('Error seeding admin user:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedAdmin();
