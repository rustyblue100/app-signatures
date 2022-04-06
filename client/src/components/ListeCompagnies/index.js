import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeiiiioooouuuunc------";

    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}


function ListeCompagnie() {
    const [data, setData] = useState([]);
    const [state, setState] = React.useState(true);



    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get("/employes")
                .then((response) => {
                    setData(response.data);
                    setState(false);
                })
                .catch((error) => console.log(error));
        };
        fetchData();
    }, []);

    const unique = [...new Map(data.map(item => [item.compagnie, item])).values()]

    return (
        <ul className="list-group">
            {unique.map(c => {
                return c.compagnie && <li className="list-group-item"><Link to={`/signatures/${c.compagnie && string_to_slug(c.compagnie)}`}>{c.compagnie}</Link></li>
            })}
        </ul>
    )
}

export default ListeCompagnie