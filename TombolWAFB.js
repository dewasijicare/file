function initContactButtons() {
    const target = document.querySelector("#row-quicklogin .card-body");
    if (!target || document.querySelector(".my-custom-contact-bar")) return;

    const contacts = [
        {text: "WHATSAPP", link: "https://wa.me/6282180332553", icon: "bi-whatsapp"},
        {text: "FACEBOOK", link: "https://www.facebook.com/groups/...", icon: "bi-facebook"}
    ];

    const container = document.createElement("div");
    container.className = "my-custom-contact-bar mt-4 d-grid gap-2";
    
    contacts.forEach(c => {
        const btn = document.createElement("a");
        btn.href = c.link;
        btn.className = "btn btn-custom-promo";
        btn.innerHTML = `<i class="bi ${c.icon}"></i> ${c.text}`;
        container.appendChild(btn);
    });

    target.appendChild(container);
}