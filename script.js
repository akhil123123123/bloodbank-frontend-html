// Simple static frontend logic: this will make fetch calls to common backend endpoints if available.
// It falls back to local mock results if backend is not present.

const apiBase = '';// if your backend serves API at a path, set it here, e.g. '/api'

document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const blood = document.getElementById('bloodGroup').value;
  const city = document.getElementById('city').value.trim();
  const resultsEl = document.getElementById('results');
  resultsEl.innerHTML = 'Searching...';

  try {
    // try calling an API endpoint /donors?blood=...&city=...
    const q = new URLSearchParams();
    if (blood) q.set('blood', blood);
    if (city) q.set('city', city);
    const url = apiBase + '/donors?' + q.toString();
    let data;
    try{
      const res = await fetch(url);
      if (!res.ok) throw new Error('no-api');
      data = await res.json();
    }catch(err){
      // fallback mock data
      data = [
        {name:'Ravi Kumar', phone:'9000000001', blood:'O+', city:'Hyderabad'},
        {name:'Priya Sharma', phone:'9000000002', blood:'A+', city:'Hyderabad'}
      ];
    }
    if (data.length===0) resultsEl.innerHTML = '<div class="result-item">No donors found.</div>';
    else resultsEl.innerHTML = data.map(d=>`<div class="result-item"><strong>${d.name}</strong><div>${d.blood} · ${d.city}</div><div>${d.phone}</div></div>`).join('');
  } catch (err) {
    resultsEl.innerHTML = '<div class="result-item">Error searching donors.</div>';
    console.error(err);
  }
});

document.getElementById('donorForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('d_name').value.trim();
  const phone = document.getElementById('d_phone').value.trim();
  const blood = document.getElementById('d_blood').value;
  const city = document.getElementById('d_city').value.trim();
  const msg = document.getElementById('donorMsg');
  msg.style.display = 'none';

  const payload = {name, phone, blood, city};

  try {
    const res = await fetch(apiBase + '/donors', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('no-api');
    const j = await res.json();
    msg.textContent = 'Registered successfully!';
    msg.style.display = 'block';
  } catch (err) {
    // fallback: simulate success
    msg.textContent = 'Registered locally (no backend detected).';
    msg.style.display = 'block';
    console.warn(err);
  }
});
