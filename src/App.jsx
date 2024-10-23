import { useEffect, useState } from "react";

function App() {
  const [kisiler, setKisiler] = useState([]);
  const [yeniKisi, setYeniKisi] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        const data = await response.json();
        setKisiler(data.results); // Gelen veriyi state'e aktarıyoruz / Transfer incoming data to state
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, []);

  const handleKisiEkle = (e) => {
    e.preventDefault();
    const yeniKisiObjesi = {
      login: { uuid: Math.random().toString(36).substr(2, 9) }, // Rastgele bir UUID oluştur / Generate a random UUID
      email: yeniKisi.email,
      name: { first: yeniKisi.firstName, last: yeniKisi.lastName },
      picture: { thumbnail: "https://via.placeholder.com/150" }, // Placeholder resim / Placeholder image
    };
    setKisiler([...kisiler, yeniKisiObjesi]);
    setYeniKisi({ email: "", firstName: "", lastName: "" }); // Formu temizle / Clear the form
  };

  return (
    <>
      <form onSubmit={handleKisiEkle}>
        <input
          type="email"
          placeholder="Email"
          value={yeniKisi.email}
          onChange={(e) => setYeniKisi({ ...yeniKisi, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={yeniKisi.firstName}
          onChange={(e) =>
            setYeniKisi({ ...yeniKisi, firstName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={yeniKisi.lastName}
          onChange={(e) =>
            setYeniKisi({ ...yeniKisi, lastName: e.target.value })
          }
          required
        />
        <button type="submit">Add User</button>
      </form>

      {kisiler.length > 0 ? (
        kisiler.map((kisi) => (
          <div
            style={{
              backgroundColor: "rgb(24, 39, 63)",
              color: "rgb(255, 215, 0)",
              marginBottom: 20,
            }}
            key={kisi.login.uuid} // Benzersiz key olarak uuid kullanıldı / Used uuid as unique key
          >
            <div>{kisi.email}</div>
            <div>
              {kisi.name.first} {kisi.name.last}
            </div>
            <div>
              <img
                src={kisi.picture.thumbnail}
                alt={`${kisi.name.first} ${kisi.name.last}`}
              />
            </div>
            <button
              onClick={() => {
                setKisiler(
                  kisiler.filter((k) => k.login.uuid !== kisi.login.uuid)
                );
              }}
            >
              Delete User
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
