function init() {
    let picker = document.getElementById("picker");
    picker.addEventListener("change", function() {
        buildSignature(picker.value);
    });

    document.getElementById("copy").addEventListener("click", function() {
        const signature = document.getElementById("signature");

        const range = document.createRange();
        range.setStart(signature, 0);
        range.setEndAfter(signature);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);

        document.execCommand("copy");

        window.getSelection()?.removeAllRanges();
    });

    buildSignature(picker.value);
}

function buildSignature(template) {
    fetch("json/" + template + ".json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            doBuild(data);
        });
}

function doBuild(data) {
    // Picture
    el("picture").setAttribute("src", data.pictureUrl);
    el("picture").setAttribute("alt", data.name);
    el("picture").style.verticalAlign = "middle";
    el("picture").style.borderRadius = data.round;
    el("picture").style.border = data.pictureBorder ? "1px solid #f0f0f0" : "none";

    // Name and function
    el("name").innerHTML = data.name;
    el("function").innerHTML = data.function;

    // Light table
    el("light").style.backgroundColor = data.lightColor;
    el("light").style.borderRadius = data.round + " " + data.round + " 0 0";

    // Logo
    el("logo-url").setAttribute("href", data.websiteUrl);
    el("logo-image").setAttribute("src", data.logoUrl);
    el("logo-image").setAttribute("alt", data.organization);

    // Website, email, phone
    el("website").setAttribute("href", "https://" + data.websiteUrl);
    el("website").innerHTML = data.websiteUrl ? data.websiteUrl : "";
    el("email").setAttribute("href", "mailto:" + data.email);
    el("email").innerHTML = data.email ? data.email : "";
    if (data.phone)
        el("phone").setAttribute("href", "tel:" + "+" + data.phone.replace(/\(0\)/g, '').replace(/[\D]/g, ''));
    el("phone").innerHTML = data.phone ? data.phone : "";

    // Dark table
    el("dark").style.backgroundColor = data.darkColor;
    el("dark").style.borderRadius = "0 0 " + data.round + " " + data.round;

    // Tagline
    el("tagline").innerHTML = data.tagline;

    // Icons
    el("icons").innerHTML = "";
    data.icons.forEach(icon => {
        let iconLinkEl = document.createElement("a");
        iconLinkEl.setAttribute("href", icon.websiteUrl);
        iconLinkEl.setAttribute("target", "_blank");
        iconLinkEl.style.marginLeft = "8px";
        el("icons").appendChild(iconLinkEl);

        let iconImgEl = document.createElement("img");
        iconImgEl.setAttribute("src", icon.logoUrl);
        iconImgEl.setAttribute("alt", icon.name);
        iconImgEl.style.height = "20px";
        iconImgEl.style.width = "20px";
        iconImgEl.style.borderRadius = "10px";
        iconImgEl.style.verticalAlign = "middle";
        iconLinkEl.appendChild(iconImgEl);
    });
}

function el(id) {
    return document.getElementById("sgn-" + id);
}