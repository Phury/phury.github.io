
function _parseRichtext(rtext) {
  return {__html: '<p>' + rtext.split('\n').join('</p><p>') + '</p>' }
}

function _isDefined(x) {
    return !(x === undefined);
}

var options = {
    language: "en"
};

var DateFormat = React.createClass({
    _months: [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    render: function() {
        var ddmmyyyy = this.props.date.split("-");
        var dd = ddmmyyyy[0];
        var mm = ddmmyyyy[1];
        var yyyy = ddmmyyyy[2];
        var month = this._months[parseInt(mm)-1];
        return (<span className="date">{month} {yyyy}</span>);
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
        github: "https://phury.github.io/img/glyphicons-social-22-github.png",
        stackoverflow: "https://phury.github.io/img/glyphicons-social-65-stackoverflow.png",
        linkedin: "https://phury.github.io/img/glyphicons-social-18-linked-in.png",
        tumblr: "https://phury.github.io/img/glyphicons-social-9-tumblr.png",
        instagram: "https://phury.github.io/img/glyphicons-social-33-instagram.png"
    },
    
    render: function() {
        var url = this._mapping[this.props.name];
        return (<img src={url} />); 
    }       
});

var SkillBar = React.createClass({
    render: function() {
        return (
            <span>
                <div className="skill">
                    <div className="skill-progress" style={{width: this.props.percentage + '%'}}>
                        <span className="nowrap">{this.props.name}</span> <span className="sr-only">{this.props.percentage}</span>
                    </div>
                </div>
            </span>
        );
    }
});

var SkillTag = React.createClass({
    render: function() {
        return (
            <div className="skill">{this.props.name}</div>
        );
    }
});

var ContactInfo = React.createClass({
    render: function() {
        return (
            <section className="contactInfo">
                <h3>Contact</h3>
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
            <section className="socialInfo">
                <h3>Social</h3>
                <nav className="social">
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
            return (<li key={i}><SkillTag name={elt.language} percentage={elt.level * 20} /></li>);
        });
        return (
            <section className="language">
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
            <section className="interests">
                <h3>Interests</h3>
                <ul>{elements}</ul>
            </section>
        );
    }
});

var PersonalInfo = React.createClass({
    
    render: function() {
        if (this.props.personalInfo == null) return null;

        return (
            <section className="about">
                <div className="wrapper"> 
                    <div className='row'>   
                        <div className='col-md-5 wow bounceInLeft'>
                            <section className="overview">
                                <img className="avatar" src={this.props.personalInfo.avatar} alt="profile picture" />
                                <h1 className="wow flipInX" data-wow-delay="2s"><nobr>{this.props.personalInfo.firstName}</nobr> <nobr>{this.props.personalInfo.lastName}</nobr></h1>
                                <h2 className="wow flipInX" data-wow-delay="3s">{this.props.personalInfo.role}</h2>
                            </section>
                        </div>
                        <div className='col-md-7 wow bounceInRight' data-wow-delay="1s">
                            <h3>About</h3>
                            <p>{this.props.about.en}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

var ExperienceList = React.createClass({
    
    render: function() {
        if (this.props.workExperience == null) return null;

		var entryList = this.props.workExperience.map(function(elt, i) {
			return (
                <section className="timeline-item wow bounceInUp" key={i}>
                    <div className="timeline-icon">
                        <DateFormat date={elt.period.from} />
                    </div>
                    <div className="timeline-content">
                        <h4><span className="company">{elt.company}</span>, <span className="location">{elt.location}</span> — <span className="role">{elt.role}</span></h4>
                        <p>{elt.detail.en}</p>
                    </div>
                </section>
			); 
		});
		return (
			<section className="experience">
                <div className="wrapper"> 
    				<h3>Experience</h3>
                    <div className="timeline">
    				    {entryList}
                    </div>
                </div>
			</section>
		);
	} 
});
        
        
var EducationList = React.createClass({
    
    render: function() {
        if (this.props.education == null) return null;

		var entryList = this.props.education.map(function(elt, i) {
			return (
                <section key={i} className='wow bounceInUp'>
                     <h4><span className="institution">{elt.institution}</span> — <span className="degree">{elt.degree}</span></h4>
                     <PeriodFormat period={elt.period} />
                </section>
			); 
		});
		return (
			<section className="education">
                <div className='wrapper'>
                    <h3>Education</h3>
                    {entryList}
                </div>
			</section>
		);
	} 
});

var FooterInfo = React.createClass({
    
    render: function() {
        if (this.props.contactInfo == null) return null;

        return (
            <section className="footer">
                <div className='wrapper'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <ContactInfo contactInfo={this.props.contactInfo} />
                            <SocialInfo socialInfo={this.props.socialInfo} />
                        </div>
                        <div className='col-md-4'>
                            <LanguageInfo languages={this.props.languages} />
                        </div>
                        <div className='col-md-4'>
                            <InterestInfo interests={this.props.interests} />
                        </div>
                    </div>
                </div>
            </section>
        );
    } 
});

        
var SkillList = React.createClass({
    
    render: function() {
        if (this.props.skills == null) return null;

		var skillList = this.props.skills.map(function(elt, i) {
            return (
                <SkillTag key={i} name={elt.skill} percentage={elt.level * 20} />
            );
		});
		return (
			<section className="skills">
                <div className='wrapper wow bounceInUp'>
                    <h3>Skills</h3>
                    <div>{skillList}</div>
                </div>
			</section>
		);
	} 
});

var ResumeInfo = React.createClass({
    
    render: function() {
        if (this.props.objectives == null) return null;

        return (
            <div className="content">
                <section className="objectives">
                    <div className="wrapper wow bounceInUp"> 
                        <h3>Objectives</h3>
                        <p>{this.props.objectives.en}</p>
                    </div>
                </section>
                <ExperienceList workExperience={this.props.workExperience} />
                <SkillList skills={this.props.skills} />
                <EducationList 
                    education={this.props.education} />
                <FooterInfo
                    socialInfo={this.props.socialInfo}
                    contactInfo={this.props.contactInfo}
                    languages={this.props.languages}
                    interests={this.props.interests} />

            </div>
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
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        if (this.state.personalInfo == null) return null;

        var contactInfo = { phone: this.state.personalInfo.phone, email: this.state.personalInfo.email };

		return (
			<div className="container-fluid">
				<div className="row">
					<PersonalInfo 
                        personalInfo={this.state.personalInfo}
                        about={this.state.about} />
					<ResumeInfo
						objectives={this.state.objectives}
						workExperience={this.state.workExperience}
                        skills={this.state.skills} 
                        education={this.state.education}
                        languages={this.state.languages}
                        interests={this.state.interests}
                        socialInfo={this.state.personalInfo.social}
                        contactInfo={contactInfo} />
				</div>
			</div>
		);
    }
});


ReactDOM.render(
  <ResumeApp source='/resume/data/resume.json' />,
  document.getElementById('app')
);