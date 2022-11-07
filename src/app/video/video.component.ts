import { Component, OnDestroy, OnInit } from '@angular/core';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import { SabiasQueComponent } from '../sabias-que/sabias-que.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy  {
  player?: videojs.Player;
  constructor(public dialog: MatDialog) {}

  // Instantiate a Video.js player OnInit
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
    myPlayer.on('timeupdate', () => {
      if (Math.floor(myPlayer.currentTime()) != lastStopped) {
        if (Math.floor(myPlayer.currentTime()) === 10) {
          
          let botonInfo = document.createElement('div');
          botonInfo.innerHTML = `<div> <button style="position: absolute; top: 0; background: blue;">A</button> </div>`;


          myPlayer.el().appendChild(botonInfo);

          //Contenido que tiene el botonInfo
          var content = '<div class="prueba-class"><h1>hola</h1>s<p>que tal</p></div>';
          myComponent.contentEl().innerHTML = content;
          
          var modal = new CustomModal(myPlayer, {
            temporary: false,
            content: myComponent.contentEl(),
          });
      
          modal.createEl();
          myPlayer.addChild(modal);
          lastStopped = 10;
          
          botonInfo.lastElementChild?.addEventListener('click', () => {
            modal.open();
          });
        }
      }

      if (Math.floor(myPlayer.currentTime()) === 20) {
        myPlayer.el().lastElementChild?.remove();
      }

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

