class CustomToast extends HTMLElement {
  constructor() {
    super();
    this.toastTimeout = null;
    this.progressTimeout = null;
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
            <style>
                /* CSS for the toast */
                .toast {
                    position: absolute;
                    top: 25px;
                    right: 30px;
                    border-radius: 12px;
                    background: #fff;
                    padding: 20px 35px 20px 25px;
                    box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
                    transform: translateX(calc(100% + 30px));
                    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
                    overflow: hidden;
                }

                .toast.active {
                    transform: translateX(0%);
                }

                .toast-content {
                    display: flex;
                    align-items: center;
                }

                .check {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 35px;
                    min-width: 35px;
                    background-color: ${this.accentColor || "#4070f4"};
                    color: #fff;
                    font-size: 20px;
                    border-radius: 50%;
                }

                .message {
                    display: flex;
                    flex-direction: column;
                    margin: 0 20px;
                }

                .message .text {
                    font-size: 16px;
                    font-weight: 400;
                    color: #666666;
                }

                .message .text.text-1 {
                    font-weight: 600;
                    color: #333;
                }

                .close {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    padding: 5px;
                    cursor: pointer;
                    opacity: 0.7;
                }

                .close:hover {
                    opacity: 1;
                }

                .progress {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    width: 100%;
                }

                .progress:before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    height: 100%;
                    width: 100%;
                    background-color: ${this.accentColor || "#4070f4"};
                }

                .progress.active:before {
                    animation: progress 5s linear forwards;
                }

                @keyframes progress {
                    100% {
                        right: 100%;
                    }
                }
            </style>

            <div class="toast">
                <div class="toast-content">
                    <i class="${
                      this.iconClass || "fas fa-solid fa-bell"
                    } check"></i>
                    <div class="message">
                        <span class="text text-1">${
                          this.title || "Success"
                        }</span>
                        <span class="text text-2">${
                          this.message || "Your changes have been saved"
                        }</span>
                    </div>
                </div>
                <i class="fa-solid fa-xmark close"></i>
                <div class="progress"></div>
            </div>
        `;
  }

  addEventListeners() {
    const toast = this.querySelector(".toast");
    const closeIcon = this.querySelector(".close");
    const progress = this.querySelector(".progress");

    this.addEventListener("click", () => {
      toast.classList.add("active");
      progress.classList.add("active");

      this.toastTimeout = setTimeout(() => {
        toast.classList.remove("active");
      }, 5000);

      this.progressTimeout = setTimeout(() => {
        progress.classList.remove("active");
      }, 5300);
    });

    closeIcon.addEventListener("click", () => {
      toast.classList.remove("active");
      setTimeout(() => {
        progress.classList.remove("active");
      }, 300);

      clearTimeout(this.toastTimeout);
      clearTimeout(this.progressTimeout);
    });
  }

  get iconClass() {
    return this.getAttribute("icon-class");
  }

  get title() {
    return this.getAttribute("title");
  }

  get message() {
    return this.getAttribute("message");
  }

  get accentColor() {
    return this.getAttribute("accent-color");
  }
}

customElements.define("custom-toast", CustomToast);
