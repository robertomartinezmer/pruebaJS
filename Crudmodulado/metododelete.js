//POST (Delete)
export const mdelete = async () => {
    try {
        let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
        },
            res = await fetch(
                `http://localhost:5555/santos/${e.target.dataset.id}`,
                options
            ),
            json = await res.json();

        if (!res.ok)
            throw { status: res.status, statusText: res.statusText };

        location.reload();
    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        alert(`Error ${err.status}: ${message}`);
    }
}