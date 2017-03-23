var DateFormat = React.createClass({
    _months: [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    render: function() {
        var ddmmyyyy = this.props.date.split('-');
        var dd = ddmmyyyy[0];
        var mm = ddmmyyyy[1];
        var yyyy = ddmmyyyy[2];
        var month = this._months[parseInt(mm)-1];
        return (<span className='date'>{month} {yyyy}</span>);
    }       
});

var PeriodFormat = React.createClass({
    render: function() {
        return (
            <span className='period'>
                <DateFormat date={this.props.period.from} /> — <DateFormat date={this.props.period.to} />
            </span>
        );
    }       
});                 

            
var SocialIcon = React.createClass({
     _mapping: {
        github: 'https://phury.github.io/img/glyphicons-social-22-github.png',
        stackoverflow: 'https://phury.github.io/img/glyphicons-social-65-stackoverflow.png',
        linkedin: 'https://phury.github.io/img/glyphicons-social-18-linked-in.png',
        tumblr: 'https://phury.github.io/img/glyphicons-social-9-tumblr.png',
        instagram: 'https://phury.github.io/img/glyphicons-social-33-instagram.png'
    },
    
    render: function() {
        var url = this._mapping[this.props.name];
        return (<img src={url} />); 
    }       
});

var SkillTag = React.createClass({
    render: function() {
        return (
            <div className='skill'>{this.props.name}</div>
        );
    }
});

var ContactInfo = React.createClass({
    render: function() {
        return (
            <section className='contactInfo'>
                <h3 id='contact'>Contact</h3>
                <ul>
                    <li>{this.props.contactInfo.phone}</li>
                    <li>{this.props.contactInfo.email}</li>
                </ul>
            </section>
        );
    }
});

var SocialInfo = React.createClass({
    
    getDefaultProps: function() {
        return {
          socialInfo: []
        };
    },
    
    render: function() {
        var elements = this.props.socialInfo.map(function(elt, i) {
            return (<a key={i} href={elt.link}><SocialIcon name={elt.name} />{elt.name}</a>);
        });
        return (
            <section className='socialInfo'>
                <h3>Social</h3>
                <nav className='social'>
                    {elements}
                </nav>
            </section>
        );
    }
});

var LanguageInfo = React.createClass({
    getDefaultProps: function() {
        return {
          languages: []
        };
    },
    
    render: function() {
        var elements = this.props.languages.map(function(elt, i) {
            return (<li key={i}>{elt.language} <span>- {elt.level}</span></li>);
        });
        return (
            <section className='language'>
                <h3>Language</h3>
                <ul>{elements}</ul>
            </section>
        );
    }
});

var InterestInfo = React.createClass({
    getDefaultProps: function() {
        return {
          interests: []
        };
    },
    
    render: function() {
        var elements = this.props.interests.map(function(elt, i) {
            return (<li key={i}>{elt}</li>);
        });
        return (
            <section className='interests'>
                <h3>Interests</h3>
                <ul>{elements}</ul>
            </section>
        );
    }
});


var FooterComponent = React.createClass({
    
    render: function() {
        if (this.props.contactInfo == null) return null;
        return (
            <section className='footer'>
                <div className='wrapper'> 
                    <div className='row'>   
                        <div className='col-md-4 col-xs-6'>   
                            <ContactInfo contactInfo={this.props.contactInfo} />
                            <SocialInfo socialInfo={this.props.socialInfo} />
                        </div>
                        <div className='col-md-4 col-xs-6'>   
                            <LanguageInfo languages={this.props.languages} />
                        </div>
                        <div className='col-md-4 col-xs-6'>   
                            <InterestInfo interests={this.props.interests} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

var EducationComponent = React.createClass({
    
    render: function() {
        if (this.props.education == null) return null;

        var entryList = this.props.education.map(function(elt, i) {
            return (
                <section key={i} className='wow bounceInUp'>
                     <h4><span className='institution'>{elt.institution}</span> — <span className='degree'>{elt.degree}</span></h4>
                     <PeriodFormat period={elt.period} />
                </section>
            ); 
        });
        return (
            <section className='education'>
                <div className='wrapper'>
                    <h3 id='education'>Education</h3>
                    {entryList}
                </div>
            </section>
        );
    } 
});

var SkillComponent = React.createClass({
    
    render: function() {
        if (this.props.skill == null) return null;

        var skillList = this.props.skill.values.map(function(elt, i) {
            return (
                <SkillTag key={i} name={elt.skill} percentage={elt.level * 20} />
            );
        });
        return (
            <div className='col-md-4 wow bounceInUp'>
                <h4>{this.props.skill.name}</h4>
                {skillList}
            </div>
        );
    } 
});

var SkillsComponent = React.createClass({
    
    render: function() {
        if (this.props.skills == null) return null;

        var skillList = this.props.skills.map(function(elt, i) {
            return (
                <SkillComponent key={i} skill={elt} />
            );
        });
        return (
            <section className='skills'>
                <div className='wrapper'>
                    <h3 id='skills'>Skills</h3>
                    <div className='row'>
                        {skillList}
                    </div>
                </div>
            </section>
        );
    } 
});

var ExperienceComponent = React.createClass({
    
    render: function() {
        if (this.props.workExperience == null) return null;

        var entryList = this.props.workExperience.map(function(elt, i) {
            var overview = elt.overview.en.split('\n').map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br/>
                </span>
              );
            });

            return (
                <section className='timeline-item wow bounceInUp' key={i}>
                    <div className='timeline-icon'>
                        <DateFormat date={elt.period.from} />
                    </div>
                    <div className='timeline-content'>
                        <h4><span className='company'>{elt.project ? elt.project+' - ('+elt.company+')' : elt.company}</span>, <span className='location'>{elt.location}</span> — <span className='role'>{elt.role}</span></h4>
                        <p>{overview}</p>
                    </div>
                </section>
            ); 
        });
        return (
            <section className='experience'>
                <div className='wrapper'> 
                    <h3 id='experience'>Experience</h3>
                    <div className='timeline'>
                        {entryList}
                    </div>
                </div>
            </section>
        );
    }
});

var IntroComponent = React.createClass({
    
    render: function() {
        if (this.props.personalInfo == null) return null;
        
        var objectives = this.props.objectives.en.split('\n').map(function(item, key) {
          return (
            <span key={key}>
              {item}
              <br/>
            </span>
          );
        });

        return (
            <section className='intro'>
                <div className='wrapper'> 
                    <div className='row'>   
                        <div className='col-md-5 wow bounceInLeft'>
                            <section className='overview'>
                                <img className='avatar' src={this.props.personalInfo.avatar} alt='profile picture' />
                                <h1 className='wow flipInX' data-wow-delay='1s'><nobr>{this.props.personalInfo.firstName}</nobr> <nobr>{this.props.personalInfo.lastName}</nobr></h1>
                                <h2 className='wow flipInX' data-wow-delay='2s'><nobr>{this.props.personalInfo.role}</nobr></h2>
                            </section>
                        </div>
                        <div className='col-md-7'>
                            <section className='about wow bounceInRight' data-wow-delay='3s'>
                                <div className='wrapper'>
                                    <h3 id='about'>About</h3>
                                    <p>{this.props.about.en}</p>
                                </div>
                            </section>
                            <section className='objectives wow bounceInRight' data-wow-delay='4s'>
                                <div className='wrapper'>
                                    <h3 id='objectives'>Objectives</h3>
                                    <p>{objectives}</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

var NavbarComponent = React.createClass({
    
    render: function() {
        //if (this.props.personalInfo == null) return null;
        return (
            <nav className='navbar navbar-default navbar-fixed-top'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <button type='button' 
                            className='collapsed navbar-toggle' 
                            data-toggle='collapse' 
                            data-target='#resume-navbar' 
                            aria-expanded='false'> 
                            <span className='sr-only'>Toggle navigation</span> 
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span> 
                            <span className='icon-bar'></span> 
                        </button> 
                        <a href='#' className='navbar-brand'>Pierre-Henri Van de Velde</a> 
                    </div>
                    <div className='collapse navbar-collapse' id='resume-navbar'>
                        <ul className='nav navbar-nav'>
                            <li className='active'><a href='#about'>About</a></li>
                            <li><a href='#objectives'>Objectives</a></li>
                            <li><a href='#experience'>Experience</a></li>
                            <li><a href='#skills'>Skills</a></li>
                            <li><a href='#education'>Education</a></li>
                            <li><a href='#contact'>Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

var ResumeApp = React.createClass({
    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        this.serverRequest = $.getJSON(this.props.source, function(data) {
            this.setState(data);
        }.bind(this));

        this.jqueryHandle();
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    jqueryHandle: function() {
        new WOW().init();
        
        $( document ).ready(function() {
            $(".navbar ul li a[href^='#']").on('click', function(e) {
               e.preventDefault();
               var hash = this.hash;
               $('html, body').animate({
                   scrollTop: $(hash).offset().top - 60
                 }, 250, function(){
                   window.location.hash = hash;
                 });
            });            
            
            $(function () {
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 250) {
                        $('.navbar').fadeIn();
                    } else {
                        $('.navbar').fadeOut();
                    }
                });
            });

        });
    },

    render: function() {
        if (this.state.personalInfo == null) return null;

        var contactInfo = { 
            phone: this.state.personalInfo.phone, 
            email: this.state.personalInfo.email 
        };
        var personalInfo = { 
            firstName: this.state.personalInfo.firstName, 
            lastName: this.state.personalInfo.lastName, 
            avatar: this.state.personalInfo.avatar,
            role: this.state.personalInfo.role
        };
        return (
            <div className='container-fluid'>
                <NavbarComponent />
                <div className='row'>
                    <IntroComponent
                        personalInfo={personalInfo}
                        about={this.state.about}
                        objectives={this.state.objectives} />
                    <ExperienceComponent
                        workExperience={this.state.workExperience} />
                    <SkillsComponent
                        skills={this.state.skills} />
                    <EducationComponent
                        education={this.state.education} />
                    <FooterComponent
                        contactInfo={contactInfo}
                        socialInfo={this.state.personalInfo.social}
                        languages={this.state.languages}
                        interests={this.state.interests} />
                </div>
            </div>
		);
    }
});


ReactDOM.render(
  <ResumeApp source='/data/resume.json' />,
  document.getElementById('app')
);