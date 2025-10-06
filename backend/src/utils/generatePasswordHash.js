const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function generatePasswordHash() {
  rl.question('Sisesta admin parool: ', async (password) => {
    try {
      const hash = await bcrypt.hash(password, 10);
      console.log('\n✅ Genereeritud hash:');
      console.log(hash);
      console.log('\nKoperi see hash database/seed.sql faili:');
      console.log(`INSERT INTO users (username, password_hash, email, role, is_active) VALUES`);
      console.log(`('admin', '${hash}', 'admin@bmamotors.ee', 'admin', TRUE);`);
    } catch (error) {
      console.error('❌ Viga:', error.message);
    } finally {
      rl.close();
    }
  });
}

generatePasswordHash();
