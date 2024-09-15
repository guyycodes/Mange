/* 
  © 2023 Level up apps and software llc. All rights reserved.
  This file is part of Levelupco.com and is proprietary content. 
  Unauthorized copying or distribution is prohibited.
*/
/**
 * Represents a Fibonacci sphere.
 * @class
 */
class FibonacciSphere {
    #points;
    /**
     * Get the points of the sphere.
     * @returns {Array<Array<number>>} An array of 3D coordinates.
     */
    get points() {
        return this.#points;
    }
    /**
     * Create a Fibonacci sphere.
     * @param {number} N - The number of points to generate on the sphere.
     */
    constructor(N) {
        this.#points = [];

        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < N; i++) {
            const y = 1 - (i / (N - 1)) * 2;
            const radius = Math.sqrt(1 - y ** 2);
            const a = goldenAngle * i;
            const x = Math.cos(a) * radius;
            const z = Math.sin(a) * radius;

            this.#points.push([x, y, z]);
        }
    }
}

/**
 * Represents a 3D tags cloud.
 * @class
 */
export class TagsCloud {
    root;
    size;
    sphere;
    tags;
    rotationAxis;
    rotationAngle;
    rotationSpeed;
    frameRequestId;

    constructor(root) {
        this.root = root;
        this.size = this.root.offsetWidth;
        this.tags = root.querySelectorAll('.tag');
        this.sphere = new FibonacciSphere(this.tags.length);
        this.rotationAxis = [1, 0, 0];
        this.rotationAngle = 0;
        this.rotationSpeed = .01;

        this.updatePositions();
        this.initEventListeners();
        this.root.classList.add('-loaded');
    }
    /**
     * Initialize event listeners for the tags cloud.
     * @private
     */
    initEventListeners() {
        window.addEventListener('resize', this.updatePositions.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    updatePositions() {
        const sin = Math.sin(this.rotationAngle);
        const cos = Math.cos(this.rotationAngle);
        const ux = this.rotationAxis[0];
        const uy = this.rotationAxis[1];
        const uz = this.rotationAxis[2];

        const rotationMatrix = [
            [
                cos + (ux ** 2) * (1 - cos),
                ux * uy * (1 - cos) - uz * sin,
                ux * uz * (1 - cos) + uy * sin,
            ],
            [
                uy * ux * (1 - cos) + uz * sin,
                cos + (uy ** 2) * (1 - cos),
                uy * uz * (1 - cos) - ux * sin,
            ],
            [
                uz * ux * (1 - cos) - uy * sin,
                uz * uy * (1 - cos) + ux * sin,
                cos + (uz ** 2) * (1 - cos)
            ]
        ];

        const N = this.tags.length;

        for (let i = 0; i < N; i++) {
            const x = this.sphere.points[i][0];
            const y = this.sphere.points[i][1];
            const z = this.sphere.points[i][2];

            const transformedX =
                  rotationMatrix[0][0] * x
            + rotationMatrix[0][1] * y
            + rotationMatrix[0][2] * z;
            const transformedY =
                  rotationMatrix[1][0] * x
            + rotationMatrix[1][1] * y
            + rotationMatrix[1][2] * z;
            const transformedZ =
                  rotationMatrix[2][0] * x
            + rotationMatrix[2][1] * y
            + rotationMatrix[2][2] * z;

            const translateX = this.size * transformedX / 2;
            const translateY = this.size * transformedY / 2;
            const scale = (transformedZ + 2) / 3;
            const transform =
                  `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
            const opacity = (transformedZ + 1.5) / 2.5;

            this.tags[i].style.transform = transform;
            this.tags[i].style.opacity = opacity;
        }
    }
    /**
     * Handle mouse movement to rotate the cloud.
     * @param {MouseEvent} e - The mouse event.
     * @private
     */
    onMouseMove(e) {
        const rootRect = this.root.getBoundingClientRect();
        const deltaX = e.clientX - (rootRect.left + this.root.offsetWidth / 2);
        const deltaY = e.clientY - (rootRect.top + this.root.offsetHeight / 2);
        const a = Math.atan2(deltaX, deltaY) - Math.PI / 2;
        const axis = [Math.sin(a), Math.cos(a), 0];
        const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const speed = delta / Math.max(window.innerHeight, window.innerWidth) / 50;

        this.rotationAxis = axis;
        this.rotationSpeed = speed;
    }
    /**
     * Update the rotation of the cloud.
     */
    update() {
        this.rotationAngle += this.rotationSpeed;

        this.updatePositions();
    }
    /**
     * Start the animation of the tags cloud.
     */

    start() {
        this.update();

        this.frameRequestId = requestAnimationFrame(this.start.bind(this));
    }
    /**
     * Stop the animation of the tags cloud.
     */
    stop() {
        cancelAnimationFrame(this.frameRequestId);
    }
}
/**
 * An array of tags to be used in the tags cloud.
 * @type {string[]}
 */
export const tagsForTheCloud = [ 
    'Health Profile', 'Diet Plans', 
    'Gemini', 'Nutrition', "Advice",
    'Personalized', 'Health', 
    'Diet', 'Health Insights', 
    'Smart Diet', 'Wellness Tips', 
    'Stay Healthy', 'Healthy Living', 
    'Get Started', 'Tailored Plans', 
    'Fitness Goals', 'AI Nutrition'
  ];