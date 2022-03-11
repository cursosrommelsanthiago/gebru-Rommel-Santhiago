import React from 'react'
import axios from 'axios'

import Modal from './Modal'
import AddTrack from '../AddTrack'
import { Container, Title, ContentCard, Description, Cover, CoverBackground, CardTitle, Span, Button } from './style'

const url = 'https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists'
const headers = {
  headers: {
  Authorization: 'rommel-santhiago-gebru',
  },
}

export default class Playlists extends React.Component {
  constructor() {
    super();
    this.state = {
        playlists: [],
        tracks: [{
          name: '',
          artist: '',
          url: ''
      }],
        show: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

    componentDidMount() {
        this.pegaPlaylists()
    }

    pegaPlaylists = async () => {
      try {
        const res = await axios.get(url, headers)
        this.setState({ playlists: res.data.result.list })
      } catch (err) {
        console.log("Erro >", err.message)
      } 
    }

    deletePlaylist = async (listId) => {
      try {
        const res = await axios.delete(`${url}/${listId}`, headers)
        alert(`Playlist deletada com sucesso!`)
        this.pegaPlaylists()
        this.handleClose()
        console.log(res)
      } catch (err) {
        console.log(err.response)
      }
    }

    getPlaylistTracks = async (listId) => {
      try {
        const res = await axios.get(`${url}/${this.props.listId}/tracks`, headers)
        this.setState({ tracks: res.data.result.list })
        console.log(res)
      } catch (err) {
        console.log(err.response)
      }
    }

    handleShow = () => {
      this.setState({show: true})
      this.getPlaylistTracks()
    }

    handleClose = () => {
      this.setState({ show: false })
    }

    render() {
        
        const trackLists = this.state.tracks.map((track) => {
          return <p key={track.id}>{track.name}</p>
        })

        const renderPlaylists = this.state.playlists.map((playlist) => {
            return <Description key={playlist.id}>
                <Cover>
                  <CoverBackground />
                </Cover>
                <CardTitle>
                  <Button playlistID={playlist.id} onClick={() => this.handleShow(playlist.id)} color={'whitesmoke'} backgroundColor={'transparent'}><Span>{playlist.name} ≡</Span></Button> 
                  <Modal show={this.state.show} handleClose={this.handleClose}>
                    <AddTrack playlistID={playlist.id}/>
                    {trackLists}
                    <Button onClick={() => this.deletePlaylist(playlist.id)} color={'red'} backgroundColor={'whitesmoke'} right={'20px'}>Apagar Lista</Button>
                  </Modal>
                </CardTitle>
              </Description>
        })

        return (
            <Container>
                <Title>Playlist</Title>
                <ContentCard>
                  {renderPlaylists}
                </ContentCard>
            </Container>
        )
    }
}