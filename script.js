document.getElementById("donorForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        bloodGroup: document.getElementById("bloodGroup").value,
        phone: document.getElementById("phone").value
    };

    const res = await fetch("http://localhost:8080/api/donors", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });

    alert("Registered Successfully!");
});
