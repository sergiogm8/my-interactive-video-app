import { Component, OnDestroy, OnInit } from '@angular/core';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy  {
  player?: videojs.Player;
  constructor() {}

  ngOnInit(): void {
    this.player = videojs('video', {
      fluid: true,
      sources: [
        {
          src: '../assets/que_es_un_pc.mp4',
          type: 'video/mp4',
        },
      ],
    });
    
    var CustomModal = videojs.getComponent('ModalDialog');
    var myPlayer = this.player;
    const myComponent = this.createComponent(myPlayer);
    // videojs.registerComponent('SabiasQueComponent', SabiasQueComponent);



    // this.player.on('pause', () => {
    //   const contentEl = document.createElement('div');
    //   contentEl.innerHTML = `
    //   <div>
    //     <h1>
    //       <strong>Multiple Choice Question</strong>
    //     </h1>
    //     <br/>
    //     <button type="button" class="btn btn-primary" style="background: #007bff">Answer 1</button>
    //     <br/><br/>
    //     <button type="button" class="btn btn-primary" style="background: #007bff">Answer 2</button>
    //     <br/><br/>
    //     <button type="button" class="btn btn-primary" style="background: #007bff">Answer 3</button>
    //   </div>
    //   `;

    //   // Modals are temporary by default. They dispose themselves when they are
    //   // closed; so, we can create a new one each time the player is paused and
    //   // not worry about leaving extra nodes hanging around.
    //   const modal = this.player?.createModal(contentEl, {});

    //   // When the modal closes, resume playback.
    //   modal?.on('modalclose', () => {
    //     this.player?.play();
    //   });
    // });


    let lastStopped = 0;
    let botonInfo = document.createElement('div');
    botonInfo.innerHTML = `
    <div>
      <button class="boton-info">
        <h1>🤔¿Sabías que...?</h1>
        <p>¡Hazme click!</p>
      </button>
    </div>`;
    myPlayer.on('timeupdate', () => {
      if (Math.floor(myPlayer.currentTime()) != lastStopped) {
        if (Math.floor(myPlayer.currentTime()) === 10) {
          lastStopped = 10;
          this.showBotonInfo(myPlayer, botonInfo);
          
          //Contenido del modal que despliega el botonInfo
          let content = `
          <div class="container-wrapper">
            <div class="contenedor">
              <h1>Sabías que...</h1>
              <p>El primer ordenador considerado como tal fue el Z1, diseñado y construido en 1938 por el ingeniero alemán
              Konrad Zuse. Básicamente, era una calculadora binaria, mecánica que leía instrucciones de una cinta perforada.</p>
              <img src="../assets/imgs/z1.jpg"/>
            </div>
          </div>`;
          let modal = this.createModal(myPlayer, myComponent, CustomModal, content);
          
          botonInfo.addEventListener('click', () => {
            modal.open();
          });
        }

        if (Math.floor(myPlayer.currentTime()) === 20) {
          this.removeBotonInfo(myPlayer, botonInfo);
        }

        if (Math.floor(myPlayer.currentTime()) === 42) {
          let content = `
          <div class="container-wrapper">
            <div class="contenedor">
              <h1>¡Pregunta sorpresa!</h1>
                <h2>¿Sabes cómo se representa la información en un ordenador?</h2>
                <div class="btn-container">
                  <button id="1" class="btn btn-primary btn-default">a. Con ceros y unos (sistema binario)</button>
                  <br/><br/>
                  <button id="2" class="btn btn-primary btn-default">b. Con números (sistema decimal)</button>
                  <br/><br/>
                  <button id="3" class="btn btn-primary btn-default">c. Con letras y números (sistema alfanúmerico)</button>
                </div>
            </div>
          </div>
          `;
          let correctAnswer = "1";
          let questionModal = this.createModal(myPlayer, myComponent, CustomModal, content);
          questionModal.open();
          lastStopped = 42;
          this.questionModalHandler(questionModal, correctAnswer);
        }
      }
    });
  }
  questionModalHandler(questionModal: videojs.ModalDialog, correctAnswer: string) {
    questionModal.contentEl().querySelectorAll('.btn').forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.remove('btn-default');
        if (button.id === correctAnswer) {
          this.correctAnswerHandler(button, questionModal);
        } else {
          this.wrongAnswerHandler(button, questionModal);
        }
      });
    });
  }

  correctAnswerHandler(button: Element, questionModal: videojs.ModalDialog) {
    button.classList.add('btn-success');
    alert('¡Respuesta correcta!');
    setTimeout(() => {
      questionModal.close();
    }, 1000);
  }

  wrongAnswerHandler(button: Element, questionModal: videojs.ModalDialog) {
    button.classList.add('btn-fail');
  }



  removeBotonInfo( myPlayer: VideoJsPlayer, botonInfo: HTMLDivElement,) {
    botonInfo?.querySelector('.boton-info')?.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(0)' },
    ], {
      duration: 500,
      iterations: 1
    });
    if (botonInfo != null) {
      myPlayer.el().lastElementChild?.remove();
    }
  }

  createModal(myPlayer: VideoJsPlayer, myComponent: any, CustomModal: { new(player: VideoJsPlayer, options?: videojs.ModalDialogOptions | undefined): videojs.ModalDialog; prototype: videojs.ModalDialog; }, content:string) {
    // var content = `
    //       <div class="container-wrapper">
    //         <div class="contenedor">
    //           <h1>Sabías que...</h1>
    //           <p>El primer ordenador considerado como tal fue el Z1, diseñado y construido en 1938 por el ingeniero alemán
    //           Konrad Zuse. Básicamente, era una calculadora binaria, mecánica que leía instrucciones de una cinta perforada.</p>
    //           <img src="../assets/imgs/z1.jpg"/>
    //         </div>
    //       </div>`;
    myComponent.contentEl().innerHTML = content;
          
    var modal = new CustomModal(myPlayer, {
      temporary: false,
      content: myComponent.contentEl(),
    });

    modal.createEl();
    myPlayer.addChild(modal);
    return modal;
  }

  showBotonInfo(myPlayer: VideoJsPlayer, botonInfo: HTMLDivElement) {
    myPlayer.el().appendChild(botonInfo);
    botonInfo.querySelector('.boton-info')?.animate([
      { transform: 'scale(0)' },
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' }
    ], {
      duration: 500,
      iterations: 1
    });
  }

  // Dispose the player OnDestroy
  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  createComponent(myPlayer: VideoJsPlayer): any {
    var Component = videojs.getComponent('Component');
    class SabiasQue extends Component {
      constructor(player:VideoJsPlayer, options:VideoJsPlayerOptions) {
        super(player, options);
      }
    }
    return new SabiasQue(myPlayer, {});
  }
}

