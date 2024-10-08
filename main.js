const surveyJson = {
  pages: [
    {
      name: "page1",
      elements: [
        {
          name: "Problematique",
          title: "Quelle est votre problématique",
          type: "radiogroup",
          choices: [
            { value: "charge travail", text: "Charge de travail" },
            { value: "stress au travail", text: "Stress au travail" },
            {
              value: "communication",
              text: "Communication et relations internes",
            },
            { value: "egalite", text: "Egalité et diversité" },
            { value: "reconnaissance", text: "Reconnaissance et valorisation" },
            { value: "harcelement", text: "Harcèlement" },
            { value: "droits", text: "Droits du travail et lois" },
          ],
          showOtherItem: true,
        },
      ],
    },
    {
      name: "page2",
      elements: [
        {
          name: "StressLevel",
          title: "Comment évaluez-vous votre niveau de stress ?",
          type: "rating",
          visibleIf: "{Problematique} = 'stress au travail'",
          minRateDescription: "Faible",
          maxRateDescription: "Élevé",
        },
        {
          name: "WorkloadSatisfaction",
          title: "Êtes-vous satisfait de votre charge de travail actuelle ?",
          type: "radiogroup",
          visibleIf: "{Problematique} = 'charge travail'",
          choices: ["Oui", "Non"],
        },
        {
          name: "LawKnowledge",
          title: "Je souhaite ...",
          type: "radiogroup",
          visibleIf: "{Problematique} = 'droits'",
          choices: [
            "Avoir des informations sur mes droits au travail",
            "Avoir une aide personnalisée concernant mes droits",
          ],
        },
        {
          name: "FAQ",
          title: "Voici quelques informations sur vos droits au travail :",
          type: "html",
          visibleIf:
            "{LawKnowledge} = 'Avoir des informations sur mes droits au travail'",
          html: "<p>[Lien vers la FAQ]</p>",
        },
        {
          name: "Consultants",
          title: "Voici une liste de consultants en droit du travail :",
          type: "html",
          visibleIf:
            "{LawKnowledge} = 'Avoir une aide personnalisée concernant mes droits'",
          html: "<p>[Liste des consultants]</p>",
        },
        {
          name: "CommunicationFeelings",
          title:
            "Comment évaluez-vous la communication au sein de votre équipe ?",
          type: "radiogroup",
          visibleIf: "{Problematique} = 'communication'",
          choices: ["Très bonne", "Bonne", "Moyenne", "Mauvaise"],
        },
        {
          name: "DiversityFeelings",
          title:
            "Pensez-vous que votre entreprise valorise l'égalité et la diversité ?",
          type: "radiogroup",
          visibleIf: "{Problematique} = 'egalite'",
          choices: ["Oui", "Non"],
        },
        {
          name: "HarassmentFeelings",
          title: "Avez-vous déjà été victime de harcèlement au travail ?",
          type: "radiogroup",
          visibleIf: "{Problematique} = 'harcelement'",
          choices: ["Oui", "Non"],
        },
      ],
    },
  ],
};

const survey = new Survey.Model(surveyJson);

survey.onValueChanged.add(function (sender, options) {
  const currentQuestion = options.question;

  if (
    currentQuestion.getType() === "radiogroup" ||
    currentQuestion.getType() === "checkbox"
  ) {
    if (sender.currentPage.isCompleted) {
      sender.nextPage();
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  survey.render(document.getElementById("surveyContainer"));
});
