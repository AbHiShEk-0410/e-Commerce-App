import "./Error404.css"
export default function Error404() {
    return (
        <section class="page-404">
            <div>
                <div class="bg-404">
                    <h1>Error 404! </h1>
                </div>
                <div class="error-msg">
                    <h3>
                        Look like you're lost
                    </h3>
                    <p>the page you are looking for not avaible!</p>
                    <a href="/product" class="link-404">Go to Products</a>
                </div>
            </div>
        </section>
    )
}