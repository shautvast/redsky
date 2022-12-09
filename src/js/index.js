import '../css/app.css';

(function () {
    let width = window.innerWidth,
        height = window.innerHeight;
    const num_clouds = 200;
    let size_factor = Math.random() * 1000 + 1500,
        max_cloud_size = (width * height) / size_factor,
        max_speed_x = 50,
        max_speed_y = 30,
        num_clusters = 30;
    let cluster_x, cluster_y, cluster_size, cloud_counter;


    const sky = document.getElementById("sky");
    sky.onclick = () => {
        sky.requestFullscreen().then();
    };

    document.onkeypress = () => {
        size_factor = Math.random() * 1000 + 2000;
        max_cloud_size = (width * height) / size_factor;
        arrange_clouds();
    }


    window.onresize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
    };

    let create_clouds = function () {
        for (let i = 0; i < num_clouds; i++) {
            let newCloud = document.createElement("div");
            newCloud.setAttribute("id", `${i}`);
            newCloud.setAttribute("class", "cloud");
            const size = 200 + Math.random() * max_cloud_size;
            newCloud.style.width = `${size}px`;
            newCloud.style.height = `${size}px`;
            // let green_shift = Math.random() * 50 - 25;
            // let red_shift = Math.random() * 50 - 25;
            // newCloud.style.background = `radial-gradient(circle ${size / 2}px, rgba(255, ${255 - green_shift}, 0, ${Math.random()}), rgba(0, 0, 0, 0.0)) no-repeat`;
            // orange
            newCloud.style.background = create_gradient(size, i);

            newCloud.setAttribute("size", `${size}`);
            sky.appendChild(newCloud);
        }
    }

    let arrange_clouds = function () {
        let num_clouds_in_cluster = (Math.floor(num_clouds / num_clusters));
        for (let i = 0; i < num_clouds; i++) {
            if (i % num_clouds_in_cluster === 0) {
                cluster_x = 100 + Math.random() * width;
                cluster_y = 100 + Math.random() * height;
                cluster_size = Math.random() * 150;
            }

            let cloud = get_cloud(i);
            cloud.style.left = `${cluster_x - max_cloud_size / 2 + Math.random() * cluster_size}px`;
            cloud.style.top = `${cluster_y - max_cloud_size / 2 + Math.random() * cluster_size}px`;
        }
    }

    let step = function () {
        for (let i = 0; i < 10; i++) {
            let cloud_index = Math.floor(Math.random() * num_clouds);

            let cloud = get_cloud(cloud_index);
            let x = parseInt(cloud.style.left), y = parseInt(cloud.style.top);

            x += (Math.random() - Math.random()) * max_speed_x;
            y += (Math.random() - Math.random()) * max_speed_y;
            if ((x > width && y > height) || (x < -max_cloud_size && y < -max_cloud_size)) {
                cloud_counter += 1;
                if (cloud_counter > (num_clouds / num_clusters)) {
                    cluster_size = Math.random() * max_cloud_size;
                    cluster_x = width + cluster_size + Math.random() * width;
                    cluster_y = height + cluster_size + Math.random() * height;
                    cloud_counter = 0;
                }

                cloud.style.transition = "none";

                cloud.style.top = `${(cluster_x + Math.random() * cluster_size)}px`;
                cloud.style.left = `${(cluster_y + Math.random() * cluster_size)}px`;

                let size = parseInt(cloud.getAttribute("size")) + Math.random();
                cloud.style.width = `${size}px`;
                cloud.style.height = `${size}px`;
                cloud.setAttribute("size", `${size}`);
                // let green_shift = Math.random() * 250;
                //create radial gradient from orange to purple

                cloud.style.background = create_gradient(size, cloud.id);

            } else {
                cloud.style.transition = "left 10s, top 10s";
                cloud.style.left = `${x}px`;
                cloud.style.top = `${y}px`;
            }
        }
        requestAnimationFrame(step);
    };

    let create_gradient = function (size, i) {
        const shift = Math.random() * 80 - 40;
        // yellow
        if (i % 3 === 0) {
            return `radial-gradient(circle ${size / 2}px, rgba(${200 - shift}, ${150}, 0, 1.0), rgba(0, 0, 0, 0.0)) no-repeat`;
        }
        // blue
        if (i % 4 === 1) {
            return `radial-gradient(circle ${size / 2}px, rgba(${100 + shift}, 0, ${200 + shift}, 1.0), rgba(0, 0, 0, 0.0)) no-repeat`;
        }
        // purple
        if (i % 4 === 2) {
            return `radial-gradient(circle ${size / 2}px, rgba(${61 + shift}, 1, ${88 + shift}, 1.0), rgba(0, 0, 0, 0.0)) no-repeat`;
        }
        // orange
        if (i % 4 === 3) {
            return `radial-gradient(circle ${size / 2}px, rgba(${200 + shift}, ${80 + shift}, 1, 1.0), rgba(0, 0, 0, 0.0)) no-repeat`;
        }
    }


    let get_cloud = function (index) {
        return document.getElementById(`${index}`);
    }

    create_clouds();
    arrange_clouds();
    requestAnimationFrame(step);
})()